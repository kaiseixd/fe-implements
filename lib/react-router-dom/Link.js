import React from 'react';
import { __RouterContext as RouterContext } from '@/react-router';
import { resolveToLocation, normalizeToLocation } from "./utils/locationUtils";

let { forwardRef } = React;

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

const LinkAnchor = forwardRef(
    ({ innerRef, navigate, onClick, ...rest }, forwardRef) => {
        const { target } = rest;

        return (
            <a
                {...rest}
                ref={forwardRef || innerRef}
                onClick={event => {
                    try {
                        onClick && onClick(event);
                    } catch (e) {
                        event.preventDefault();
                        throw e;
                    }

                    if (
                        !event.defaultPrevented && // onClick prevented default
                        event.button === 0 && // ignore everything but left clicks
                        (!target || target === "_self") && // let browser handle "target=_blank" etc.
                        !isModifiedEvent(event) // ignore clicks with modifier keys
                    ) {
                        event.preventDefault();
                        navigate();
                    }
                }}
            />
        );
    }
);

const Link = forwardRef(
    (
        { component = LinkAnchor, replace, to, innerRef, ...rest },
        forwardedRef
    ) => {
        return (
            <RouterContext.Consumer>
                {context => {
                    const { history } = context;

                    const location = normalizeToLocation(
                        resolveToLocation(to, context.location),
                        context.location
                    );

                    const href = location ? history.createHref(location) : "";

                    return React.createElement(component, {
                        ...rest,
                        ref: forwardedRef || innerRef,
                        href,
                        navigate() {
                            const location = resolveToLocation(to, context.location);
                            const method = replace ? history.replace : history.push;

                            method.call(history, location);
                        }
                    });
                }}
            </RouterContext.Consumer>
        );
    }
);

export default Link;