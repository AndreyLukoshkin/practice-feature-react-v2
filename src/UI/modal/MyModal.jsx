import React from 'react'
import styles from './MyModal.module.css'

const MyModal = ({ children, visible, setVisible }) => {
  const rootStyle = [styles.myModal]
  if (visible) rootStyle.push(styles.active)

  return (
    <div className={rootStyle.join(' ')} onClick={() => setVisible(false)}>
      <div
        className={styles.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default MyModal
