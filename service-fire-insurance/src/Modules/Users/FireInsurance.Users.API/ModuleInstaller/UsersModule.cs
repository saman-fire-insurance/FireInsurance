using System.Reflection;   

namespace FireInsurance.Users.API.ModuleInstaller
{
    public static class UsersModule
    {
        public static readonly Assembly Assembly = Assembly.GetExecutingAssembly();

        public static readonly IEnumerable<Assembly> Assemblies = [
            Assembly,
            Infrastructure.AssemblyReference.Assembly,
            Application.AssemblyReference.Assembly
        ];

        /// <summary>
        /// Only for testing purposes.
        /// </summary>
        public static readonly Assembly Database = Infrastructure.AssemblyReference.Assembly;
    }
}
