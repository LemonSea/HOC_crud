const menuList = [
    {
        "title": "首页",
        "key": "/home",
        "icon": "home"
    },
    {
        "title": "角色管理",
        "key": "/role",
        "icon": "appstore",
        "children": [
            {
                "title": "角色管理",
                "key": "/role/role",
                "icon": "appstore"
            },
            {
                "title": "权限管理",
                "key": "/role/authority",
                "icon": "appstore"
            }]
    },
    {
        "title": "公司",
        "key": "/company",
        "icon": "appstore",
        "children": [
            {
                "title": "公司管理",
                "key": "/company/list",
                "icon": "appstore"
            },
            {
                "title": "权限管理",
                "key": "/role/authority",
                "icon": "appstore"
            }]
    },
    {
        "title": "员工管理",
        "key": "/staff",
        "icon": "appstore",
        "children": [
            {
                "title": "公司管理",
                "key": "/staff/StaffStatus",
                "icon": "appstore"
            }
        ]
    }
]

export default menuList