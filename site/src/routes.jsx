import React from "react";
import {
    BrowserRouter as Router,
    Route,
    // Link,
    Redirect,
    Switch
} from "react-router-dom";
import HomePage from "./pages/home";
import SpectreComponent from "./pages/component";
import Documentation from "./pages/doc";
import NotFound from "./pages/notFound";
import Test from "./components/test";

const isValidPath = path => {
    const indexReg = /\/(index)?\/?(zh-CN|en-US)?\/?$/i;
    const docsReg = /\/docs\/[a-z]+\/?(zh-CN|en-US)?\/?$/i;
    const componentsReg = /\/components\/[a-z]+\/?(zh-CN|en-US)?\/?$/i;
    const regs = [indexReg, docsReg, componentsReg];
    return regs.some(reg => reg.test(path));
};

const LangHandleRoute = ({ component: Component, ...rest }) =>
    <Route
        {...rest}
        render={props => {
            const lan =
                navigator && navigator.language === "zh-CN" ? "zh-CN" : "en-US";
            let pathname = props.location.pathname;
            if (
                !/.*\/(zh-CN|en-US)\/?$/i.test(pathname) &&
                isValidPath(pathname)
            ) {
                // if / then redirect to index
                if (pathname === "/") {
                    pathname = "/index";
                }
                return (
                    <Redirect
                        to={{
                            pathname: `${pathname}/${lan}/`.replace("//", "/"),
                            from: { state: props.location }
                        }}
                    />
                );
            }
            return <Component {...props} />;
        }}
    />;

class Wrapper extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route
                            exact
                            path="/index/:language"
                            component={HomePage}
                        />
                        <Route
                            exact
                            path="/components/:componentName/:language"
                            component={SpectreComponent}
                        />
                        <Route
                            exact
                            path="/docs/:docName/:language"
                            component={Documentation}
                        />
                        <Route component={NotFound} />
                    </Switch>
                    <Test />
                </div>
            </Router>
        );
    }
}

// TODO language Provider
export default () =>
    <Router>
        <div>
            <LangHandleRoute path="/" component={Wrapper} />
        </div>
    </Router>;
