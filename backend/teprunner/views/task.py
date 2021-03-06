# encoding=utf-8

import datetime

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django.db import connections
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from loguru import logger

from backend import settings

# 创建 BackgroundScheduler 对象实例，通过 DjangoJobStore 保存到数据库中
scheduler = BackgroundScheduler(timezone=settings.TIME_ZONE)
scheduler.add_jobstore(DjangoJobStore())


def delete_old_job_executions(max_age=7 * 24 * 60 * 60):
    """This job deletes all apscheduler job executions older than `max_age` from the database."""
    # 定时删除执行记录的任务
    DjangoJobExecution.objects.delete_old_job_executions(max_age)


# 添加定时任务
scheduler.add_job(
    delete_old_job_executions,
    trigger=CronTrigger(
        day_of_week="mon", hour="00", minute="00"
    ),  # Midnight on Monday, before start of the next work week.
    id="delete_old_job_executions",
    max_instances=1,
    replace_existing=True,
)
logger.info(
    "Added weekly job: 'delete_old_job_executions'."
)


def close_old_connections():
    _old_atomic_update_or_create = DjangoJobExecution.atomic_update_or_create

    def atomic_update_or_create_with_close(lock,
                                           job_id: str,
                                           run_time: datetime,
                                           status: str,
                                           exception: str = None,
                                           traceback: str = None, ) -> "DjangoJobExecution":
        job_execution = _old_atomic_update_or_create(
            lock, job_id, run_time, status, exception, traceback, )
        for conn in connections.all():
            conn.close_if_unusable_or_obsolete()
        return job_execution

    DjangoJobExecution.atomic_update_or_create = atomic_update_or_create_with_close


close_old_connections()

# 启动任务
try:
    logger.info("Starting scheduler...")
    scheduler.start()
except KeyboardInterrupt:
    logger.info("Stopping scheduler...")
    scheduler.shutdown()
    logger.info("Scheduler shut down successfully!")
