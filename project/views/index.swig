<!DOCTYPE html>
<html>
<head>
    <% include "./common/header.swig" %>
    <$ "index"|importCSS $>
</head>
<body>
    <div class="container index-bg" >
        <div class="row col-md-12" style="margin-top: 15%;">
            <h1 class="text-info well wellbg" >
                记录你每天的运动
            </h1>
        </div>
        <div class="row col-md-12 " style="margin-top: 35%;">
            <button class="btn btn-lg btn-info btn-block" >
                登录
            </button>
            <button class="btn btn-lg btn-success btn-block" >
                注册
            </button>
        </div>
    </div>
    <% include "./common/footer.swig" %>
    <$ "common,index"|importJS $>
</body>
</html>