import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styles from "./loading.module.scss";
class Loading extends PureComponent {
  render() {
    return this.props.isLoading ? (
      <div className={`${styles["loading"]}`}>
        <div>
          <div className="spinner-border text-primary"></div>
          <div className="spinner-border text-success"></div>
          <div className="spinner-border text-info"></div>
          <div className="spinner-border text-warning"></div>
          <div className="spinner-border text-danger"></div>
          <div className="spinner-border text-dark"></div>
          <div className="spinner-border text-light"></div>
        </div>
      </div>
    ) : (
      <></>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.loadingReducer.isLoading,
  };
};
export default connect(mapStateToProps, null)(Loading);
