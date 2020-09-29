# farm-management
# luong di client connect server bang axios(trong file action redux) => route=> controller => mogo => cho client 
# login : username + pw => goi redux - userloginFetchs(file actionAuth.js)=> connect server bang axios kem theo Authorization 
	=> file api.js(nhan req /login) => controller(authcontroller) => goi generateToken(req data(thong tin dang nhap),secret(string),
		tokenlife(1h)) de tao token(trong file helper) => gui token ve cho client ( data.secret.ma-hask)
			 => client res success thi return true gui ve file login (dang nhap thanh cong)
