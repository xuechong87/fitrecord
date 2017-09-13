<html>
<body>
    <form name="repayform" method="post" action="<$ postAddress $>">
        <input name="orderId" value="<$ data.orderId $>" type="hidden"/>
        <input name="merUserId" value="<$ data.merUserId $>" type="hidden"/>
        <input name="amount" value="<$ data.amount $>" type="hidden"/>
        <input name="payVendor" value="<$ data.payVendor $>" type="hidden"/>
        <input name="tx" value="<$ data.tx$>" type="hidden"/>
        <input name="payType" value="<$ data.payType $>" type="hidden"/>
        <input name="orderTime" value="<$ data.orderTime $>" type="hidden"/>
        <input name="sign" value="<$ data.sign $>" type="hidden"/>
    </form>
    <script>
        document.repayform.submit();
    </script>
</body>
</html>
