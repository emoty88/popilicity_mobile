import {
  StyleSheet,
  Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerColored: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  LoginImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 100,
    borderWidth: 10,
    borderColor: '#ecf0f1',
  },
  Line: {
    width: 295,
    borderBottomWidth: 1,
    borderColor: '#bdc3c7',
  },
  LoginBtn: {
    backgroundColor: '#e91e63',
    marginTop: 20,
    width: 295,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  LoginBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  ForgetPwd: {
    marginTop: 15,
    color: '#bdc3c7',
    fontSize: 15
  },
  textInput: {
    height: 40,
    width: 295,
    paddingLeft: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  LandingImage:{
    width: 350,
    height: 170,
    marginTop: 100,
  },
  NavBarContainer:{
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor:'#fafafa',
    height: 60,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  SearchTabArea: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor:'#fafafa',
    height: 45,
    alignItems: 'center',
  },
  SearchTabs: {
    flex:1,
    justifyContent:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    alignSelf: 'stretch',
  },
  SearchTabsText:{
    fontWeight: '700',
    color: '#c8c8c8',
    fontSize: 12,
    textAlign: 'center'
  },
  SearchTabsTextActive:{
    color: '#3498db',
  },
  SearchTabsActive: {
    borderBottomColor: '#2980b9',
  },
  NavBarTitle: {
    fontSize: 20,
    color: '#2980b9',
  },
  navBarButtonText:{
    color: '#2980b9',
    fontSize: 15,
    fontWeight: '500',
  },
  FullWidth:{
    alignSelf: 'stretch',
  },

  PostItemContainer:{
    backgroundColor: '#ffffff',
    marginTop: 13,
    marginLeft: 13,
    marginRight: 13,
    borderRadius: 5,
  },
  PostItemProfileImage:{
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
    marginLeft: 10,
  },
  PostItemProfileName:{
    color: '#262626',
    fontSize: 17,
    marginLeft: 12,
    marginTop: 13,
  },
  PostItemPostInfoText: {
    color: '#262626',
    marginLeft: 12,
    marginRight: 10,
    marginTop: 5,
  },
  PostItemPostImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    marginTop: 10,
    marginRight: -13,
    marginLeft: -13,
    alignSelf: 'center',
  },
  PostItemActionsContainer: {
    flexDirection: 'row',
    padding:5,
  },
  PostItemActionsSeperator: {
    //backgroundColor: 'blue',
    width:5,
    height: 25,
    marginLeft:5,
    marginTop: 5,
    borderLeftWidth: 1,
    borderColor: '#ecf0f1',
  },
  PostItemCommentLineContainer: {
    flex:1,
    flexDirection: 'row',
    //borderColor: '#ecf0f1',
  },
  PostItemCommentLine: {
    margin:5,
    flex:60,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    //borderColor: 'red',
  },
  PostItemAcionIcon: {
    margin: 5,
    color: '#262626',
  },
  PostItemAcionIconLiked: {
    color: '#FF3D7F',
  },
  PostItemAcionIconDisLiked: {
    color: '#262626',
  },
  PostItemCommentAreaContainer: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
  },
  PostItemComment: {
    color: '#262626',
    fontSize: 15,
  },
  PostItemCommentViewAll: {
    color: '#999999',
    fontSize: 13,
    margin:3,
  },
  PostItemCommentDate: {
    color: '#999999',
    fontSize: 12,
    margin:3,
  },


  NavBarBottomContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#fafafa',
    height: 50,
    paddingTop: 0,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
  },
  NavBarBottomIcon: {
    margin: 5,
    color: '#bdc3c7',
  },
  NavBarBottomIconAddPost: {
    backgroundColor: '#ffffff',
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: -27,
    borderWidth: 1,
    borderColor: '#dbdbdb',

  },
  NavBarBottomIconAddPostInnerC: {
    backgroundColor: '#ff2d55',
    justifyContent: 'center',
    width: 68,
    height: 68,
    borderRadius: 34,
    marginTop: 5,
    marginLeft: 5,
    zIndex: 2,
  },
  NavBarBottomIconPlus: {
    color: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  NavBarBottomIconAddPlusShadowHider: {
    backgroundColor: '#ffffff',
    zIndex: 1,
    width:84,
    height:40,
    marginTop: -32,
    marginLeft: -2,
  },

  cameraArea: {
    backgroundColor:'black',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  cameraActionArea:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraTakeButton:{
    width:70,
    height:70,
    borderRadius: 35,
    backgroundColor:'#3498db',
    borderWidth: 5,
    borderColor: '#bceaff',
  },
  cameraTabArea: {
    height:50,
    borderTopWidth: 1,
    borderColor: '#ecf0f1',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  cameraTabButton:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraTabButtonActive:{
    borderTopWidth: 2,
    borderColor: '#3498db',
    marginTop: -2,
  },
  cameraTabButtonText: {
    color: '#c8c8c8',
    fontSize: 15,
  },
  cameraTabButtonTextActive: {
    color: '#3498db',
    fontWeight: '700',
  },
  cameraFilterArea:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cameraFilter: {
    margin:3,
    justifyContent:'center',
    alignItems: 'center',
  },
  cameraFilterThumb: {
    width:100,
    height: 100,
    marginTop: 5,
  },
  cameraFilterText:{
    fontWeight: '700',
    color: '#c8c8c8',
    fontSize: 12,
  },
  cameraFilterTextActive:{
    color: '#3498db',
  },
  photoDetailTextArea:{
    alignSelf: 'stretch',
    height:100,
    backgroundColor: "#ffffff",
    padding: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ecf0f1',
  },
  photoDetailProfilP:{
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  photoDetailPhoto:{
    width: 80,
    height: 80,

  },
  photoDetailTextA: {
    alignSelf: 'stretch',
    marginHorizontal: 10,

  },
  photoDetailTextInput: {
    height: 80,
    fontSize: 15,
  },
  fwInputContainer: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 10,
    height: 40,
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ecf0f1',

  },
  fwInputText: {
    height:25,
    width:325,

    alignSelf: 'stretch'
  },

  commentItemContainer:{
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderColor: '#bdc3c7',
    padding: 10,

  },
  commentItemProfileImage:{
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  commentItemDate:{
    fontSize: 10,
    color: '#bdc3c7',
  },
  commentItemTextArea:{
    height: 40,
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderColor: '#bdc3c7',
    padding: 5,
  },
  searchInput: {
    height: 30,
    fontSize:15,
    width: 295,
    marginLeft: 15,
    paddingLeft: 5,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
  },
  searchProfileUserItemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  searchProfileUserItemTextArea:{
    marginLeft: 10,
  },
  searchProfileUserItemImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 15,
  },
  searchProfileUserItemText: {
    fontSize: 12,
  },
  searchProfileUserItemSubText: {
    fontSize: 10,
    color: "#3498db"
  },
  SideViewProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 80,
  },
  SideViewProfileName:{
    color: '#fff',
    fontSize: 17,
    marginTop: 10,
  },
  SideViewButton:{
    color: '#fff',
    fontSize: 17,
    marginTop: 25,
  },
  SideViewLine: {
    marginTop: 25,
    width: 50,
    borderBottomWidth: 1,
    borderColor: '#75acce',
  },
  libraryimageGrid:{
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  libraryImage: {
    width: 110,
    height: 100,
    marginBottom:10,

  },
  UserProfileCard: {
    flex:1,
    //backgroundColor: '#ff5948',
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width,
    height: 135,
  },
  UserProfileCardL1 : {
    flexDirection: 'row',
    //backgroundColor: 'red',
    height: 90,
  },
  UserProfileCardL2 : {
    paddingLeft: 10,
    //backgroundColor: 'blue',
    height: 60,
  },
  UserProfileProfileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 10,
  },
  UserProfileDetailCard: {
    flex:1,
    height: 70,
    marginTop: 10,
    flexDirection: 'row',
    //backgroundColor: 'red',
  },
  ItemPointContainer: {
    flexDirection: 'row',
    marginRight:20,
    padding: 7,
    borderRadius: 5,
    alignSelf: 'flex-end',
    backgroundColor:'#2980b9',

  },
});

module.exports = styles
