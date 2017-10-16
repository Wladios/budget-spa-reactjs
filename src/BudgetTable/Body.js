import React from 'react';

const createIfNotExists = (operations, categoryId, month) => (
  operations.find(o => o.categoryId === categoryId && o.month === month) || {
    plan: 0,
    fact: 0
  }
)

const Body = ({
  months,
  categories,
  operations,
  addCategory,
  deleteCategory
}) => (

  <tbody>
    <tr>
      <td></td>
      {months.map(() => [
        <td>0</td>,
        <td>0</td>
      ])}
    </tr>
    {categories.map(c => 
      <tr key={c.id}>
        <td>
          {c.name}
          <a href="javascript:void(0)" onClick={() => deleteCategory(c.id)}>
            <i className="fa fa-trash-o"></i>
          </a>
        </td>
        {months.map(m => createIfNotExists(operations, c.id, m)).map(o => [
          <td>{o.plan}</td>,
          <td>{o.fact}</td>
        ])}
      </tr>
    )}
    <tr>
      <a href="javascript:void(0)" onClick={() => addCategory()}>Add category</a>
    </tr>
  </tbody>

);

export default Body;
