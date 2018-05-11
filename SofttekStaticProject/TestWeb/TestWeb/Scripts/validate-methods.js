/*****************************************************************
                  jQuery Validate扩展验证方法  (jackie)       
*****************************************************************/
$(function () {
    //固定电话
    $.validator.addMethod("phoneReg", function (value, element) {
        return this.optional(element) || ($.trim(value).length != 0 && /^(0\d{2,3}-\d{7,8})$/.test($.trim(value)));
    }, "请输入有效的电话格式:区号-电话号码");

    //手机号码
    $.validator.addMethod("mobilePhoneReg", function (value, element) {
        return this.optional(element) || ($.trim(value).length != 0 && /^1[34578]\d{9}$/.test($.trim(value)));
    }, "请输入11位有效手机号码");

    //零和非零开头的数字
    $.validator.addMethod("volumeMoneyReg", function (value, element) {
        return this.optional(element) || ($.trim(value).length != 0 && /^(0|[1-9][0-9]*)$/.test($.trim(value)));
    }, "请输入整数");

    //日期格式
    $.validator.addMethod("dateReg", function (value, element) {
        return this.optional(element) || ($.trim(value).length != 0 && /^\d{4}-\d{1,2}-\d{1,2}$/.test($.trim(value)));
    }, "请输入正确的日期格式");

    //手机/固话格式
    $.validator.addMethod("allPhoneReg", function (value, element) {
        return this.optional(element) || ($.trim(value).length != 0 && /^(0\d{2,3}-\d{7,8}|1[34578]\d{9})$/.test($.trim(value)));
    }, "请输入正确的手机/固话格式");

    //邮箱格式
    $.validator.addMethod("userEmailReg", function (value, element) {
        return this.optional(element) || ($.trim(value).length != 0 && /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($.trim(value)));
    }, "邮箱格式有误");

    //特殊字符验证
    $.validator.addMethod("special", function (value, element) {
        return this.optional(element) || ($.trim(value).length != 0 && /^[^\<\>]*$/.test($.trim(value)));
    }, "不可输入<或>");
});
