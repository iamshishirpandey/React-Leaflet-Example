import { NextPageContext, NextComponentType } from "next";
import { compose } from "recompose";
import { connect } from "react-redux";
import Page from "../containers/page";
import { addLocation } from "../actions";
import { Store } from "../store";

interface IndexPageContext extends NextPageContext {
  store: Store;
}

const IndexPage: NextComponentType<IndexPageContext> = compose()(Page);

IndexPage.getInitialProps = ({ store, req }) => {
  const isServer: boolean = !!req;
  // const { location } = store.getState();

  // we can add any custom data here
  // for examle, the data from api server

  return {
    isServer,
  };
};

export default connect()(IndexPage);
