function mapStateToProps(state) {
  return {
    statusLogin: state.author,
    textcontent: state.content,
    newcontent: state.newcontent,
    typecollection: state.newcollection,
    getnewdata: state.getData,
    geteditdata: state.editData,
  };
}

export default mapStateToProps;
