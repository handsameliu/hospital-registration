# 医院挂号系统--毕设

> 使用nodejs进行开发，前台使用vue2进行搭建
> 后台使用express进行开发，使用mvc三层架构。使用mongoose数据库管理包对数据库进行操作。

> 启动方式：

```
    1. 安装nodejs以及mongodb数据库
    2. 进入文件夹根目录后在命令行输入npm install 安装包依赖文件
    3. 启动这个应用（MacOS 或 Linux 平台）：
            DEBUG=myapp npm start
       Windows 平台使用如下命令：
            set DEBUG=myapp & npm start 
    4. 然后在浏览器中打开 http://localhost:3000/  进入网址。
    5. 进行注册  http://localhost:3000/signUp 
```

# 数据库

**数据库设计**
**前台界面设计**
**后台界面设计**

## 数据库设计
> 采用nosql的mongodb数据库，在win10系统下开发。（需提前安装nodejs，mongodb数据库）


##### 系统用户 user
|字段|含义|备注|
|:--|:--|:--|
|_id|id|主键|
|userName|用户名||
|userPassword|用户密码||
|department|科室|外键 关联科室表 department|
|title|职称|外键 关联职称表titles||
|status|状态|-1封禁，0正常，999超级管理员|
|createTime|创建时间||
|updateTime|修改时间||

##### 科室 department
|字段|含义|备注|
|:--|:--|:--|
|_id|id|主键|
|name|科室名称||
|createTime|创建时间||
|updateTime|修改时间||

##### 职称 titles
|字段|含义|备注|
|:--|:--|:--|
|_id|id|主键|
|name|职称名称||
|createTime|创建时间||
|updateTime|修改时间||

##### 界面模块 modules
|字段|含义|备注|
|:--|:--|:--|
|_id|id|主键|
|name|模块名称||
|createTime|创建时间||
|updateTime|修改时间||

##### 模块权限表 jurisdiction
|字段|含义|备注|
|:--|:--|:--|
|_id|id|主键|
|title|职称|外键 关联职称表 titles|
|module|模块|唯一数组类型 存放模块ID|
|createTime|创建时间||
|updateTime|修改时间||

##### 患者表 patient
|字段|含义|备注|
|:--|:--|:--|
|_id|id|主键|
|name|患者姓名||
|cardId|患者身份证号||
|socialSecurityId|患者社保卡号||
|address|患者通信地址||
|mobile|患者联系方式||
|userId|创建患者医生ID|外键 关联用户表 user|
|createTime|创建时间||
|updateTime|修改时间||

##### register 挂号
|字段|含义|备注|
|:--|:--|:--|
|_id|id|主键|
|patientId|患者ID|外键 关联患者表ID|
|departmentId|科室ID|外键 关联科室表ID |
|userId|主治医师ID|外键 关联用户表ID|
|type|目前就诊状态|0刚挂号未分诊，1已分诊等待就诊，2就诊中，3挂起，4就诊完毕|
|test|体检项|外键 可为空 关联体检项表ID|
|medicine|药物|外键 可为空 关联药物表ID|
|symptom|症状||
|testResults|体检结果|Object{id:体检项ID,result:结果文字描述}|
|createTime|创建时间||
|updateTime|修改时间||

##### test 体检项
|字段|含义|备注|
|:--|:--|:--|
|_id|id|主键|
|name|体检项名称||
|department|体检项所在科室|外键 关联科室项ID|
|desc|描述 备注||
|createTime|创建时间||
|updateTime|修改时间||

##### medicine
|字段|含义|备注|
|:--|:--|:--|
|_id|id|主键|
|name|药物名称||
|desc|常用计量 备注||
|createTime|创建时间||
|updateTime|修改时间||
