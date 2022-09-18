import { AbstractControl, FormGroup } from '@angular/forms';
import {IPaginateList, IPagination} from '../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {Observable} from 'rxjs';
export abstract class BaseTable<T> {
  records: T[] = [];
  filterForm!: FormGroup;
  pagination!: IPagination

  protected constructor(
    protected activatedRouteBase: ActivatedRoute,
  ) {
    const resolvedData = this.activatedRouteBase?.snapshot?.data?.resolvedData;
    this.setDataAndPagination(resolvedData?.data, resolvedData?.pagination);
    console.log(resolvedData?.pagination);
  }

  onQueryParamsChange($event: NzTableQueryParams): void {
    if ($event.pageIndex !== this.pagination.perPage) {
      this.pagination.perPage = $event.pageIndex;
      this.fetchData();
    }
  }

  fetchData(): void {

  }

  processData(request: Observable<IPaginateList<T>>): void {
    request.subscribe((resp : IPaginateList<T>) => {
      this.setDataAndPagination(resp.data, resp.pagination);
    });
  }

  setDataAndPagination(data: T[], pagination: IPagination): void {
    this.records = data;
    this.pagination = pagination;
    console.log(this.pagination);
  }

  submitFilter(): void {
    this.fetchData();
  }

  resetFilter(e?: MouseEvent): void {

  }

}
