# Testing-platform Backend

> Testing platform backend by Django.

## Build Project

1. Create project

```sh
django-admin startproject teprunner
```

2. Install dependencies package

```sh
pip install --default-timeout=6000 -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
```

------

## Build user app

1. Create `user` app

```sh
django-admin startapp user
```

2. Sync model to db, and create tables

```sh
# for project
python manage.py makemigrations
python manage.py migrate

# for user app
python manage.py makemigrations user
python manage.py migrate user
```

3. Load user data in db

```sh
python manage.py loaddata user
```

> Django 会在 `user.fixtures` 目录下自动找名字为user的 .json、.xml 或 .yaml 文件进行加载。

### Project Structure

- `backend/settings`: 全局项目配置
- `backend/urls`: 全局路由配置
- `user/fixtures`: 数据准备
- `user/urls.py`: 路由配置
- `user/models.py`: 数据模型（orm）
- `user/serializers`: 数据序列化（db <=> response json）
- `user/view.py`: 后端逻辑处理

序列化器提供数据库表字段和响应json的序列化和反序列化；视图使用序列化器，编写业务处理代码。

------

## Build teprunner app

1. 创建名为`teprunner`的app:

```sh
django-admin startapp teprunner
```

2. 同步数据到数据库：

```sh
python manage.py loaddata user
```

3. 完成models后，迁移到数据库：

```sh
python manage.py makemigrations teprunner
python manage.py migrate teprunner
```

------

## Dijango 插件

- `corsheaders`: 解决跨域访问问题
- `channels`: websocket实现
- `django_apscheduler`: 定时任务

### Django 定时任务

1. 在`INSTALLED_APPS`中添加`django_apscheduler`。

2. 迁移数据库，会创建两张任务表，一张任务明细表，一张任务执行情况表。

```sh
python manage.py migrate
```

> 必须在使用 django_apscheduler 前创建好库表。

### 启动Django项目

Start django server:

```sh
python manage.py runserver
```

------

## 补充：SQLite3 Cli

```text
sqlite3 db.sqlite3

.headers on
.mode column
.timer on

.tables

select * from user;
select * from role;

.quit
```

