//что такое хуки
//хуки - это некоторые ф-ции оторые предоставляет реакт, эти ф-ции всегда начинаються со слова use
//useState()/useEffect/useRef/useMemo()/useCallback()/useContext()
//при этом хуки можно использовать либо в ф-циональных компонентах, либо в своих собственныъх хуках
//то есть на основании стандартных реакт хуков можно делать свои собственные хуки
//хуки можно использовать только на верхнем уровне вложенности
//то есть мы на можем вкладывать в хуки в ф-ции, условия
//useState() - предназначен для управления состоянием

import { useEffect, useState } from "react";
import ClassCounter from "../components/ClassCounter";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import "../styles/App.css";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostServise";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPagesCount } from "../utils/pages";
import { getPagesArray } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useRef } from "react";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";
function Posts() {
  // let likes = 5;

  // function increment() {
  //   likes += 1;
  //   console.log(likes);
  // }

  //const [value, setValue] = useState("Text inside input");
  // console.log(likes);
  // console.log(setCount);
  const [posts, setPosts] = useState([]);
  // const [posts2, setPosts2] = useState([
  //   {
  //     id: 1,
  //     title: "Flutter",
  //     body: "Description",
  //   },
  //   { id: 2, title: "Swift", body: "Description" },
  //   { id: 3, title: "Kotlin", body: "Description" },
  // ]);

  // const [SelectedSort, setSelectedSort] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPagesCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page <= totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const changePage = (page) => {
    setPage(page);
  };

  //Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      {/* чтобы добавить клас на элемент нужно использовать className
      так как слово class зарезервировано и служит для создания класов */}
      {/* <Counter /> */}
      {/* <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        // двухстороннее связывание со значением которое находиться в инпуте
        //подобные компоненты называються управляемыми, поскольку мы всегда можем изменить значение этого омпонента изменив состояние
      ></input> */}
      <ClassCounter />
      <hr style={{ margin: "15px 0" }}></hr>
      <MyButton style={{ margin: "15px 0" }} onClick={() => setModal(true)}>
        Create User
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      {/* <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Num elements on page"
        options={[
          
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Show all" },
          //this will be disbled
        ]}
      /> */}
      {postError && <h1>Error occured ${postError}</h1>}
      {isPostsLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10vh",
          }}
        >
          <Loader />
        </div>
      )}
      {/* Условная отрисовка */}
      {/* !== в нашем случае можно не использовать  */}
      {/* {sortedAndSearchedPosts.length !== 0 ? ( */}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={"Post list #1"}
      />
      <div ref={lastElement} style={{ height: 20, background: "orchid" }}></div>

      {/*  ) : (
        <div>
          <h2 style={{ textAlign: "center" }}>Posts not found!</h2>
         </div> )} */}
      {/* <PostList posts={posts2} title={"Post list #2"} /> */}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
//Обмен даными между компонентами
//Props это некоторые параметры которые может принимать компонент извне, но обмен этими пропсами идёет всегда сверху вниз, то есть от родителя к дочернему элементу
// но можно из родительского элемента передать в дочерний некоторый callback(ф-цию обратного вызова)
//в даном случае  ф-ция на вход будет ожидать post и внутри себя полученные через аргументы post будет добавлять в массив,
//мы эту ф-цию в дочернем компоненте вызыванм и тем самым нужный нам пост попадает в массив

//useMemo()- первым пармаетром этот хук принимает callback a вторым - массив зависимостей
//callback должен возвращать результат вычислений
//в массив зависимостей можно передавать какие-то переменные, поля объекта
//даная ф-ция производит некоторые вычисления запоминает результат вычислений и кэширует его, подобное поведение называеться мемоизация
// и эта ф-ция не пересчитывает заново информацию на каждую перерисовку компонента, а достает отсортированый массив из кэша
//но каждый раз когда одна из зависимостей изменилась, то ф-ция вновь пересчитывает и кэширует результат до тех пор пока опять одна из зависимостей не измениться
//если массив зависимостей пустой то ф-ция отработает единажды запомнит результат и больше вызвана не будет

//Жизненый цикл компонента
// Монтирование(mount) -> Обновление(update) -> Размонтирование(unmount)
//1 компонент создатся и монтируется DOM дерево
//2 например произошло изменение после которго последовал перерендер, то есть стадия активной жизни компонента
//3 когда он больше не нужен и по какой-то причине мы его удаляем
//монтирование нам интересно когда мы хочем сделать первичную подгрузку даных, повесить какие-то слушатели события
//на стадии обновления мы можем следить за изменеием каких либо зависимостей и производить нужные для нас действия
// а на стадии розмонтирования мы делаем различную очистку
//дл того чтобы следить за этими стадиями существует хук useEffect(callback, deps)
//его можно использовать в компоненте столько - сколько это необходимо
// один хук следит за обновлением одних даных, другой за другими, третий отрабатывает только при первичной отрисовке
// useEffect частично похож на useMemo - он также принимает некоторый callback и некоторый массив зависимостей
//когда массив зависимостей пустой - callback который мы передаем в useEffect отработает лишь единажды, когда компонент был вмонтирован
//таким образо мы можем отследить эту стадию монтирования и выполнить нужные для нас действия
// в нашем случчае нам при первичной отрисовке нужно подгрузить список постов
//для того чтобы следить за изменениями необходимо добавить какие-то зависимости в массив
//в данном  случае мы будем следить за изменениями обьекта filter и каждый раз когда этот filter изменяеться будет отрабатывать callback который мы передали в useEffect
// за стадией размонтирования также можно следить с помощью useEffect, если callback возвращает ф-цию то эта ф-ция будет вызвана в момент демонтирования компонента

//почему при попытке переключить страницы происходит некоторое отставание
//changePage(page){
//setPage(page)
//fetchPosts()
//}
//все дело в том что ф-ция fetchPosts() использует внутри себя состояния limit и page
//и соответственно порядок операций у нас такой сначала это состояние изменяем, потом вызываем ф-цию fetchPosts()
//но тут возникает нюанс, все дело в том что изменение состояния это асинхронный процес
//проблема в том что реакт не применяет изменения по одному он условно накапливает некоторую "пачку" и применяет эти изменения разом
//для того чтобы избежать повторных манипуляций с DOM
//и получаеться так что мы состояние изменили, вызвали ф-цию, но при этом там замкнуто состояние старое и получаеться что page попадает в сет запрос с некоторым отставанием
// это можно решить несколькими способами пнапример в массив зависимостей в useEffect() добавить page, а сверху в сhangePage вызов fetch вообще убрать
//также эту прлоблему можно решить без использования useEffect()
//например в саму ф-цию для получения постов принимать limit и page и при вызове этой ф-ции туда соответсвенно передвать
//поэтому в ф-ции сhangePage вызов fetch можно назад вызвать и туда уже передать аргументы(номер той страницы на которую нажал пользователь), то есть она будет актуальной
//но чтобы эти аргументы попали в ф-цию необходимо их принять в ф-ции fetching и передать в callback
