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

4. Sync model to db, and create table:

```sh
python manage.py makemigrations
python manage.py migrate
```

5. Load test user data:

```sh
python manage.py loaddata user
```

> Django 会在 user.fixtures 目录下自动找名字为user的 .json、.xml或.yaml 文件进行加载。

6. Start django server

```sh
python manage.py runserver
```

## Project Structure

