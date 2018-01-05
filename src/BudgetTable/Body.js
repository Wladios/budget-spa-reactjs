import React from 'react';
import DisplayCategory from './DisplayCategory';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import edit from '../operations/edit';
import AddPlan from './AddPlan.container';
import AddFact from './AddFact.container';
import {
  InitOperation,
  EditOperationModel,
  InitPlan,
  InitFact
} from '../operations';

const Body = ({
  budgetId,
  type,
  months,
  categories,
  category,
  operations,
  addCategory,
  addCategoryCommit,
  editCategory,
  editCategoryCommit,
  deleteCategory,
  addPlan,
  addFact,
  editPlan,
  editFact,
  editPlanCommit,
  editFactCommit
}) => (

  <tbody>
    <tr>
      <td></td>
      {months.map(m => [
        <td>{operations.filter(o => o.month === m && categories.some(c => c.id === o.categoryId)).map(o => o.plan).reduce((a, b) => a + b, 0)}</td>,
        <td>{operations.filter(o => o.month === m && categories.some(c => c.id === o.categoryId)).map(o => o.fact).reduce((a, b) => a + b, 0)}</td>,
      ])}
    </tr>
    {categories.map(c => 
      <tr key={c.id}>
        <td>
          {c.isEditing
              ? <EditCategory {...c} onSubmit={editCategoryCommit} />
              : <DisplayCategory {...c} editCategory={editCategory} deleteCategory={deleteCategory} />}
            </td>

            {months.map(m => {
              const operation = operations
                .find(o => o.categoryId === c.id && o.month === m);

              if (operation instanceof InitOperation) {
                return [
                  (operation.plan instanceof InitPlan
                    ? <td>
                      <AddPlan
                        id={budgetId}
                        categoryId={c.id}
                        month={m}
                        value={operation.plan.value}
                      />
                    </td>
                    : <td onDoubleClick={() => addPlan(c.id, m)}>0</td>),

                  (operation.fact instanceof InitFact
                    ? <td>
                      <AddFact
                        id={budgetId}
                        categoryId={c.id}                      
                        month={m}
                        value={operation.fact.value}
                      />
                    </td>
                    : <td onDoubleClick={() => addFact(c.id, m)}>0</td>)
                ];
              }

              else if (operation instanceof EditOperationModel)
                return edit(
                  operation,
                  editPlan,
                  editFact,
                  editPlanCommit,
                  editFactCommit
                );


              else if (operation == null)
                return [
                  <td onDoubleClick={() => addPlan(c.id, m)}>0</td>,
                  <td onDoubleClick={() => addFact(c.id, m)}>0</td>
                ];

              else return [
                <td onDoubleClick={() => editPlan(operation)}>{operation.plan}</td>,
                <td onDoubleClick={() => editFact(operation)}>{operation.fact}</td>
              ];
            })}
          </tr>
    )}
    <tr>
      <td>
        {category
            ? <AddCategory onSubmit={name => addCategoryCommit(budgetId, type, name)} />
            : <a onClick={() => addCategory(type)}>Add category</a>}
          </td>
          {months.map(m => [
            <td></td>,
            <td></td>
          ])}
        </tr>
      </tbody>

);

export default Body;
