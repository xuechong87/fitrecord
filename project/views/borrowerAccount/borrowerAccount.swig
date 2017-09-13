<!DOCTYPE html>
<html>
<head>
    <% include "../common/header.swig" %>
    <$ "common,borrowerAccount"|importCSS $>
</head>
<body>
    <% include "../common/commonHeaderNav.swig" %>
    <div class="w-g main-content clear">
        <div class="sub-nav">
            <ul>
                <li class="tit">我的交易</li>
                <li class="active">我的借款</li>
            </ul>
        </div>
        <div class="sub-con">
            <h2>我的借款</h2>
            <div id="J_tabs" class="loan-tabs">
                <ul class="tabs-title clear">
                    <li name=".tabs-1" class="on" data-type="J" data-box="J_pagination">全部借款</li>
                    <li name=".tabs-2" data-type="today" data-box="today_pagination">今日到期</li>
                    <li name=".tabs-3" data-type="undo" data-box="undo_pagination">尚未到期</li>
                    <li name=".tabs-4" data-type="other" data-box="other_pagination">逾期</li>
                    <li name=".tabs-5" data-type="repayed" data-box="repayed_pagination">已还清</li>
                </ul>
                <div class="tabs-content">
                    <div class="j-tabs-con tabs-1 loan-list show">
                        <table id="loan_table">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>项目编号</th>
                                    <th>借款用途</th>
                                    <th>借款金额(元)</th>
                                    <th>借款年化利率</th>
                                    <th>借款期限</th>
                                    <th>还款方式</th>
                                    <th>借款状态</th>
                                    <th>合同</th>
                                    <th>明细</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <div class="loan-list-page">
                            <div id="J_pagination" class="iv-pagination"></div>
                        </div>
                    </div>
                    <div class="j-tabs-con tabs-2 loan-list tab-today">
                        <table>
                            <thead>
                            <tr>
                                <th>序号</th>
                                <th>项目编号</th>
                                <th>期数</th>
                                <th>应还本息(元)</th>
                                <th>应还本金(元)</th>
                                <th>应付利息(元)</th>
                                <th>到期时间</th>
                                <th>还款时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                        <div class="loan-list-page">
                            <div id="today_pagination" class="iv-pagination"></div>
                        </div>
                    </div>
                    <div class="j-tabs-con tabs-3 loan-list tab-undo">
                        <table>
                            <thead>
                            <tr>
                                <th>序号</th>
                                <th>项目编号</th>
                                <th>期数</th>
                                <th>应还本息(元)</th>
                                <th>应还本金(元)</th>
                                <th>应付利息(元)</th>
                                <th>到期时间</th>
                                <th>还款时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <div class="loan-list-page">
                            <div id="undo_pagination" class="iv-pagination"></div>
                        </div>
                    </div>
                    <div class="j-tabs-con tabs-4 loan-list tab-other">
                        <table>
                            <thead>
                            <tr>
                                <th>序号</th>
                                <th>项目编号</th>
                                <th>期数</th>
                                <th>应还本息(元)</th>
                                <th>应还本金(元)</th>
                                <th>应付利息(元)</th>
                                <th>到期时间</th>
                                <th>还款时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <div class="loan-list-page">
                            <div id="other_pagination" class="iv-pagination"></div>
                        </div>
                    </div>
                    <div class="j-tabs-con tabs-5 loan-list tab-repayed">
                        <table>
                            <thead>
                            <tr>
                                <th>序号</th>
                                <th>项目编号</th>
                                <th>期数</th>
                                <th>已还本息(元)</th>
                                <th>已还本金(元)</th>
                                <th>已付利息(元)</th>
                                <th>到期时间</th>
                                <th>还款时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                        <div class="loan-list-page">
                            <div id="repayed_pagination" class="iv-pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <% include "../common/mainFooter.swig" %>
    <$ "common,borrowerAccount"|importJS $>
</body>
</html>