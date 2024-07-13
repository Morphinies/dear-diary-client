import {
  Draggable,
  Droppable,
  DragDropContext,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { FC } from 'react';
import ListAItem from './ListAItem';
import s from './ListA.module.scss';
import Loader from '../loader/Loader';

type ListAType = {
  list: any[];
  loading: boolean;
  className?: string;
  reorderLoading: boolean;
  withHandleSort: boolean;
  onDragEnd: OnDragEndResponder;
  handleEditItem: (id: string) => void;
  handleEditDelete: (id: string) => void;
  handleCompleteItem?: (id: string) => void;
};

const ListA: FC<ListAType> = ({
  list,
  loading,
  onDragEnd,
  className,
  reorderLoading,
  withHandleSort,
  handleEditItem,
  handleEditDelete,
  handleCompleteItem,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={
          s.listWrap +
          ' ' +
          ((loading || !list.length) && s.contentCenter) +
          ' ' +
          className
        }
      >
        {/* Отображать список только когда есть задачи и это не архив */}
        {loading && <Loader />}
        {!!list.length && !loading && (
          <Droppable droppableId={'droppable-1'}>
            {(provided, _) => (
              <ul
                ref={provided.innerRef}
                className={
                  s.list +
                  (withHandleSort ? ' ' + s.withHandleSort : '') +
                  (reorderLoading ? ' ' + s.load : '')
                }
                {...provided.droppableProps}
              >
                {list.map((item, index) => (
                  <Draggable
                    key={item.id}
                    index={index}
                    draggableId={'draggable-' + item.id}
                  >
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <ListAItem
                          item={item}
                          provided={provided}
                          snapshot={snapshot}
                          edit={handleEditItem}
                          del={handleEditDelete}
                          complete={handleCompleteItem}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        )}
        {!list.length && !loading && <h3 className="text-center">Пусто</h3>}
      </div>
    </DragDropContext>
  );
};

export default ListA;
