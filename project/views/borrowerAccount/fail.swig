<!DOCTYPE html>
<html >
<head>
    <% include "../common/header.swig" %>
    <$ "common,borrowerAccount"|importCSS $>
</head>

<body>
<% include "../common/commonHeaderNav.swig" %>
<div id="fail">
    <div class="result">
        <p class="pic_w"><img src="imgs/global/fail_pic.png"></p>
        <p class="res_w">很抱歉，还款失败！</p>
        <p class="index_w">
            <a href="<$ req.attrs.coreaddr $>/core/account" class="index_btn">前往我的账户</a>
        </p>
    </div>
</div>
<% include "../common/mainFooter.swig" %>
<$ "common"|importJS $>
</body>
</html>