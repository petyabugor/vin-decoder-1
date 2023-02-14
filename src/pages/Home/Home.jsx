import React, { useEffect, useRef } from 'react';
import { Search } from '../../components/common/index';
import styles from './Home.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home({
   searchValue,
   setSearchValue,
   valueFromButtonClick,
   setValueFromButtonClick,
   products,
}) {
   const [list, setList] = useState(JSON.parse(localStorage.getItem('vin')) || []);
   const isMounted = useRef(false);
   console.log(list);
   const item = products.filter((obj) => {
      if (obj.Value) {
         return true;
      }
      return false;
   });
   const showNothing = () => {
      return (
         <div className={styles.empty}>
            <h3>Даних поки що немає...</h3>
         </div>
      );
   };

   useEffect(() => {
      if (isMounted.current) {
         localStorage.setItem('vin', JSON.stringify(list));
      }
      isMounted.current = true;
   }, [list]);

   const changeValue = (obj) => {
      setValueFromButtonClick(obj);
   };

   return (
      <>
         <div className={styles.wrapper}>
            <main className={styles.main}>
               <h1 className={styles.title}>Перевірка транспортного засобу</h1>
               <p className={styles.text}>
                  Введіть 17 цифр vin-коду і отримайте найповніше розшифрування, яке є на
                  сьогоднішній день у просторах інтернету.
               </p>
               <Search
                  list={list}
                  setList={setList}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  valueFromButtonClick={valueFromButtonClick}
                  setValueFromButtonClick={setValueFromButtonClick}
               />
            </main>
            <h4 className={styles.title}>Останні запити</h4>

            <div className={styles.list}>
               {list
                  ? list.slice(Math.max(list.length - 5, 0)).map((obj, index) => (
                       <div
                          key={index}
                          className={styles.listItem}
                       >
                          <Link onClick={() => changeValue(obj)}>
                             {' '}
                             <div className={styles.vin}>{obj}</div>{' '}
                          </Link>
                       </div>
                    ))
                  : showNothing()}
            </div>
            {list && (
               <div className={styles.title}>
                  <h4 className={styles.title}>
                     Результат розшифровки він кода: {list.slice(Math.max(list.length - 1, 0))}
                  </h4>
               </div>
            )}

            {list &&
               item.map((obj) => (
                  <div
                     className={styles.characteristic}
                     key={obj.VariableId}
                  >
                     <Link
                        className={styles.characteristicLink}
                        to={`/variables/${obj.VariableId}`}
                     >
                        {obj.Variable}
                     </Link>
                     <p className={styles.characteristicText}>{obj.Value}</p>
                  </div>
               ))}
         </div>
         <footer className={styles.footer}>
            <h4 className={styles.text}> ©2023 NHTSA Sp. z o.o. Всі права захищені. WP</h4>
         </footer>
      </>
   );
}

export default Home;
