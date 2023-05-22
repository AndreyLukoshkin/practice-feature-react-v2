import React from 'react'
import MySelect from '../UI/select/MySelect'
import MyInput from '../UI/input/MyInput'

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        style={{ width: '50%', margin: '10px 0' }}
        placeholder="Search by title..."
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Sort by"
        options={[
          {
            value: 'title',
            name: 'By Title',
          },
          {
            value: 'body',
            name: 'By Description',
          },
        ]}
      />
    </div>
  )
}

export default PostFilter
