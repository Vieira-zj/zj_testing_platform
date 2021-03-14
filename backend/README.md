# Testing-platform Backend

> Testing platform backend by Django.

## Build Project

1. Create project

```sh
django-admin startproject tbackend
```

2. Install dependencies package

```sh
pip install --default-timeout=6000 -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
```

3. Create "user" app

```sh
django-admin startapp user
```

4. Sync model to db, and create table

```sh
python manage.py makemigrations
python manage.py migrate
```

5. Load test user data

```sh
python manage.py loaddata user
```

> Django 会在 user.fixtures 目录下自动找名字为user的 .json、.xml或.yaml 文件进行加载。

6. Start django server

```sh
python manage.py runserver
```

## Project Structure

- `backend/settings`: 全局项目配置
- `user/fixtures`: 数据准备
- `user/models.py`: 数据模型（orm）
- `user/serializers`: 数据序列化
- `user/urls.py`: 路由
- `user/view.py`: 后端逻辑处理

## SQLite3 Cli

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

