import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import Auth from './component/Auth';
import Feed from './component/Feed';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

const App:React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=> {
    //ユーザーの値に変化があった時に呼び出される
    //変化後の値を変数authUserに格納
    const unSub = auth.onAuthStateChanged((authUser)=> {
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          photoUrl: authUser.photoURL,
          displayName: authUser.displayName
        }))
      } else {
        //すべての値に空の文字列が代入される
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch])
  return (
    <>
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ):(
        <Auth />
      )}
    </>
  );
}

export default App;
