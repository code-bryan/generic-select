import { Component, PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props extends PropsWithChildren {
  portal?: boolean;
}

interface State {
  element: Element | null;
}

export default class PortalContainer extends Component<Props, State> {
  state: Readonly<State> = {
    element: null,
  };

  componentDidMount() {
    if (!this.props.portal) {
      return;
    }

    const element = document.createElement('div');
    document.body.appendChild(element);
    this.setState({ element });
  }
  
  render(): ReactNode {
    const { element } = this.state;
    if (!element) return this.props.children;
    return createPortal(this.props.children, element);
  }
}