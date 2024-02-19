export function getRoleIdByRoleName(roleName: string): number {
    console.log(roleName);
    const rolesMap: Record<string, number> = {
        user: 1,
        admin: 2,
    };

    return rolesMap[roleName];
}
