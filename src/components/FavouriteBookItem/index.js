import {Link} from 'react-router-dom'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import HeaderContext from '../../HeaderContext/HeaderContext'
import './index.css'

const FavouriteBookItem = props => {
  const {bookDetails} = props
  const {id, coverPic, title} = bookDetails
  return (
    <HeaderContext.Consumer>
      {value => {
        const {theme, removeFavBook} = value

        const onClickRemoveIcon = () => {
          removeFavBook(id)
        }

        const favCloseIcon = theme ? 'white' : 'black'
        const name = theme ? 'p-dark' : ''
        return (
          <li>
            <div className="fav-book-cont">
              <Link to={`/books/${id}`}>
                <div className="fav-book-content-cont">
                  <img src={coverPic} alt={title} className="fav-image-icon" />
                  <p className={`fav-title ${name}`}>{title}</p>
                </div>
              </Link>

              <button
                type="button"
                onClick={onClickRemoveIcon}
                className="fav-remove-icon"
              >
                <AiOutlineCloseCircle color={favCloseIcon} />
              </button>
            </div>
          </li>
        )
      }}
    </HeaderContext.Consumer>
  )
}

export default FavouriteBookItem
