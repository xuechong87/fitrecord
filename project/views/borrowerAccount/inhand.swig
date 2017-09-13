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
        <p class="res_w">处理中...</p>
        <p class="index_w">
            <a href="<$ req.attrs.coreaddr $>/core/account" class="index_btn">前往我的账户</a>
        </p>
    </div>
</div>
<% include "../common/mainFooter.swig" %>
<$ "common"|importJS $>
</body>
</html>