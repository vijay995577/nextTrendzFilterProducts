import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'
import HeaderContext from '../../HeaderContext/HeaderContext'
import './index.css'
import FavouriteBookItem from '../FavouriteBookItem'
import SmallNavCont from '../SmallNavCont'

class Favourite extends Component {
  render() {
    return (
      <HeaderContext.Consumer>
        {value => {
          const {theme, favBookList, removeAllFavBooks, showNavCont} = value

          const favBackCont = theme ? 'fav-dark-cont' : 'fav-cont'
          const heading = theme ? 'h1-dark' : ''
          const showNoFavBooks = favBookList.length === 0
          const favCont = theme ? 'fav-dark' : ''
          const btn = theme ? 'remove-btn-dark' : 'remove-all-btn'

          const onClickRemoveAll = () => {
            removeAllFavBooks()
          }

          return (
            <>
              <Header />
              {showNavCont ? <SmallNavCont /> : ''}
              <div className={favBackCont}>
                <div className={`fav-inner-cont ${favCont}`}>
                  <div>
                    <h1 className={`fav-heading ${heading}`}>
                      Favourite Books
                    </h1>
                    <button
                      type="button"
                      className={btn}
                      onClick={onClickRemoveAll}
                    >
                      Remove All
                    </button>
                  </div>

                  {showNoFavBooks ? (
                    <div>
                      <img
                        src="https://res.cloudinary.com/harira/image/upload/v1650458828/BookHub/360_F_49826222_9f2rGQlghv0jOYhAN7CCW73OxFu53Q62_aocprz.jpg"
                        alt="empty shelf"
                        className="empty-logo"
                      />
                      <p className={`empty ${heading}`}>Empty Shelf </p>
                    </div>
                  ) : (
                    <ul className="fav-book-list-items">
                      {favBookList.map(eachBook => (
                        <FavouriteBookItem
                          key={eachBook.id}
                          bookDetails={eachBook}
                        />
                      ))}
                    </ul>
                  )}
                </div>

                <Footer />
              </div>
            </>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default Favourite
