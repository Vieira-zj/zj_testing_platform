# zj_testing_platform

> A testing platform demo base on Vue + Django.
>
> Refer: <https://dongfanger.gitee.io/blog/>

## 前后端联调

1. 启动 Django 项目

```sh
python manage.py runserver
```

2. 启动 Vue 项目

```sh
npm run serve
```

3. 访问 <http://localhost:8080/>，管理员`admin`，密码`qa123456`

### 测试

1. 点击左上角 logo, 不会出现跳转到空白页。
2. 点击右上角信息，弹出下拉菜单，分别有修改密码、个人信息、退出登录。
3. 点击退出，返回登录页，重新登录。
4. 查询右上角个人信息，包括用户名、昵称、角色。
5. 通过右上角下拉菜单修改密码，和老密码不匹配会提示修改失败，填写正确信息会修改成功，自动跳转到登录页面重新登录。输入老密码登录失败，输入新密码登录成功。
6. 新增用户，保持默认密码，新增成功后，用 `qa123456` 登录成功。
7. 新增用户，选择自定义密码，新增成功后，用 `qa123456` 登录失败，用自定义密码登录成功。
8. 新增用户，分别创建管理员、开发、测试 3 个角色用户。
9. 使用新用户登录，管理员用户能登录成功，开发和测试由于没有后台管理权限，点击登录接口后会提示 “无菜单权限”。
10. 修改用户，修改用户名、密码，修改测试角色用户为管理员角色，重新登录，能看到用户名、密码已更新为修改后的用户名、密码，并且管理员角色生效，能登进去看到后台管理功能。
11. 输入用户名或昵称，点击搜索按钮，测试模糊查询功能正常，重置后清空搜索框，自动查询一次列表。
11. 点击删除按钮，提示是否确认删除，确认后删除成功，检查数据库 user_role 表数据也被清理干净。
12. 切换分页，刷新列表，选择不同分页条数，正常计算显示相应的分页总数。
13. 找到自定义密码的用户，点击重置密码，重置成功后，重新登录，使用自定义密码登录失败，使用默认密码 `qa123456` 登录成功。
14. 点击左侧菜单旁边的面包屑按钮，能收起和展开左侧菜单。

## TestCases Tree 控件

功能：

- 显示测试用例树
- 创建目录、新增/删除用例
- 全部展开或折叠

![img](./resources/TestcasesTree.png)

