import { theme } from 'antd';

export const useCustomTheme = (themeType) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    let boxShadow;

    if (themeType === true) {
        boxShadow = 'rgba(150, 190, 238, 0.1) 0px 0px 5px 1px';
    } else {
        boxShadow = 'rgba(150, 190, 238, 0.2) 0px 0px 20px 3px';
    }

    return { colorBgContainer, boxShadow };
};