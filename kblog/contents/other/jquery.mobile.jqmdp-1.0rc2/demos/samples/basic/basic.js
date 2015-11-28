//---------------------------------------------------------------
// ユーザ一覧ページ用クラス
function UserList(){this.initialize.apply(this, arguments)};
(function(Class){
	var This = Class.prototype;

	// ユーザテーブル。サーバが無いのでオンメモリで代用。
	var users = [
		{id:0, firstName:"Alice", lastName:"Brown", email:"alice@gmail.com", admitted:false},
		{id:1, firstName:"Bob",   lastName:"White", email:"bob@yahoo.com", admitted:true},
		{id:2, firstName:"Carol", lastName:"Black", email:"carol@wiki.org", admitted:false}
	];
	
	This.initialize = function($this) {
		this.i = 0;
	}
	This.users = function() {
		return users;
	}
	
	// 編集画面にユーザを設定してから遷移する関数。
	This.goEdit = function(aTag) {
		// data-dp-args の値を取得している。
		var id = $.jqmdp(aTag).args();
		// 編集画面のスコープインスタンスにユーザを設定している。
		$("#UserEdit").scope().setUser(users[id]);
		// 編集画面に遷移。
		$.mobile.changePage("#UserEdit", "slideright");
	}
	
	// 空のユーザを作成し編集画面に設定してから遷移する関数。
	This.newUser = function() {
		var id = users.length;
		users.push($.extend({},UserEdit.NULL_USER,{id:id}));
		$("#UserEdit").scope().setUser(users[id]);
		$.mobile.changePage("#UserEdit", "slideright");
	}
})(UserList);

//---------------------------------------------------------------
// ユーザ編集ページ用クラス
function UserEdit(){this.initialize.apply(this, arguments)};
(function(Class){
	var This = Class.prototype;
	Class.NULL_USER = {firstName:"", lastName:"", email:"", admitted:false};

	This.initialize = function($this) {
		this.$page = $this;
		this.user = Class.NULL_USER;
	}
	// 現在のユーザが設定される関数。入力項目への設定は自動で行われるので何もする必要が無い。
	This.setUser = function(user) {
		this.user = user;
	}
	// 現在のユーザに入力項目に値を設定する関数。設定後に一覧に戻る。
	This.submit = function(){
		var form = this.$page.find('form')[0];
		var user = this.user;
		user.firstName = form.firstName.value;
		user.lastName  = form.lastName.value;
		user.email     = form.email.value;
		user.admitted  = form.admitted.checked;
		// Note: 実際はここでサーバの呼び出しがあるであろう。
		$.mobile.changePage("#UserList", "slide", true);
	}
})(UserEdit);
