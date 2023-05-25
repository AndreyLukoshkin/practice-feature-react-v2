import React from 'react'
import styles from './MyButtonDelete.module.css'

const MyButtonDelete = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.myBtnDelete}>
      {children}
    </button>
  )
}

export default MyButtonDelete
