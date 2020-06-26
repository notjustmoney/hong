import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// 모든 컴포넌트에 대해 글로벌 스타일 적용

const GlobalStlye = createGlobalStyle`
    ${reset};
    * {
        box-sizing: border-box;
        font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    a:hover {
        color: inherit;
    }
    body {
        width: 100%;
        height: 100%;
        background-color: #f2f2f2;
        color: #121212;
    }
    input:focus {
        outline: none;
    }
`;

export default GlobalStlye;
