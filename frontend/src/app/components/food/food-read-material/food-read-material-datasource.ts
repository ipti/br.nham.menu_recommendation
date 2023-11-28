import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Food } from '../food.model';

// TODO: replace this with real data from your application
// const foods: Food[] = [
//   {id: 1, name: 'Teste1', code: '1', protein: 0, lipid: 0, carbo: 0, calorie: 0},
//   {id: 2, name: 'Teste2', code: '1', protein: 0, lipid: 0, carbo: 0, calorie: 0},
//   {id: 3, name: 'Teste3', code: '1', protein: 0, lipid: 0, carbo: 0, calorie: 0}
// ];

/**
 * Data source for the FoodReadMaterial view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FoodReadMaterialDataSource extends DataSource<Food> {
  data: Food[] = this.foods;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private foods: Food[]) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Food[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Food[]): Food[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Food[]): Food[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'code': return compare(a.code, b.code, isAsc);
        case 'id': return compare(a.id, b.id, isAsc);
        case 'calorie': return compare(a.calorie, b.calorie, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        case 'lipid': return compare(a.lipid, b.lipid, isAsc);
        case 'carbo': return compare(a.carbo, b.carbo, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number | null | undefined, b: string | number | null | undefined, isAsc: boolean): number {
  if (a != null && b != null && a != undefined && b != undefined) {
    // return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    if (typeof(a) === 'string')
      return String(a).localeCompare(String(b)) * (isAsc ? 1 : -1);
    else if (typeof(a) === 'number')
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    else
      window.alert("Erro na ordenação.");
      return 0;
  } else {
    window.alert("Erro na ordenação.");
    return 0;
  }
}
