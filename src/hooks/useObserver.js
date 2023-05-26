import { useEffect, useRef } from 'react'

export const useObserver = (ref, canLoad, isLoading, callback) => {
  const observer = useRef()

  useEffect(() => {
    if (isLoading) return // если загрузка - выходим, ждем пока загрузится
    if (observer.current) observer.current.disconnect() // если observer создан и в поле current что то находится - отключаем наблюдение
    var callbackObserver = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback()
      }
    }
    observer.current = new IntersectionObserver(callbackObserver) // новый интерсекншобзервер помещаем в поле карент этого рефа
    observer.current.observe(ref.current) // указываем за каким элементом будем наблюдать
  }, [isLoading])
}

export const useObserverForButton = (ref, setVisible, setHidden) => {
  const observer = useRef()
  useEffect(() => {
    var cb = function (entries, observer) {
      entries[0].isIntersecting ? setHidden() : setVisible()
    }
    observer.current = new IntersectionObserver(cb)
    observer.current.observe(ref.current)
  }, [])
}
