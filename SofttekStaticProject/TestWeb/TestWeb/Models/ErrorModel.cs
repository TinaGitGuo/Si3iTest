
    using System;

/// <summary>
    /// 异常信息模型
    /// </summary>
    public class ErrorModel
    {
        public ErrorType ErrorType { get; set; }
        public string Message { get; set; }
        public Exception OriginException { get; set; }
    }

    /// <summary>
    /// 系统错误类型
    /// </summary>
    public enum ErrorType
    {
        /// <summary>
        /// 程序内部错误
        /// </summary>
        INTERNAL,
        /// <summary>
        /// 菜单权限错误
        /// </summary>
        PAGE_AUTHORITY,
        /// <summary>
        /// 系统权限错误
        /// </summary>
        SYSTEM_AUTHORITY,
        /// <summary>
        /// 未找到页面
        /// </summary>
        PAGE_NOT_FOUND
    }

    /// <summary>
    /// 异常消息常量
    /// </summary>
    public class ErrorMessage
    {
        public const string NO_AUTHORITY = "You have no right to access this page.";

        public const string NO_MENU = "Currenct user has no menu access！";

        public const string NO_ROLE = "Please configure a role to the current user！";
    }
