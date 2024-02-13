const request = async (url: string, options?: RequestInit | undefined) => {
    try {
        insertHeaders(options);
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        if (response.ok) {
            return result;
        } else {
            console.log(response.status);
            return;
        }
    } catch (e) {
        console.log((e as Error).message);
    }
};

function insertHeaders(options?: RequestInit | undefined) {
    if (!options) {
        return;
    }

    options.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
    };

    return options;
}
const getDataTestCmd = async (options?: RequestInit | undefined) => {
    return await request('/test', options);
};

export const getDataTest = async () => {
    const options = {
        method: 'GET',
    };
    return await getDataTestCmd(options);
};
