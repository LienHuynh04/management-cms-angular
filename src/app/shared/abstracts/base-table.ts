import {FormGroup} from '@angular/forms';
import {IPaginateList, IPagination} from '../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {Observable} from 'rxjs';

export abstract class BaseTable<T> {
  records: T[] = [];
  filterForm!: FormGroup;
  pagination: IPagination = {
    perPage: 50,
    currentPage: 1,
    total: 1
  };

  protected constructor(
    protected activatedRouteBase: ActivatedRoute,
  ) {
    const resolvedData = this.activatedRouteBase?.snapshot?.data?.resolvedData;
    this.setDataAndPagination(resolvedData?.data, resolvedData?.pagination);
  }


  fetchData(): void {

  }

  processData(request: Observable<IPaginateList<T>>): void {
    request.subscribe((resp: IPaginateList<T>) => {
      this.setDataAndPagination(resp.data, resp.pagination);
    });
  }

  setDataAndPagination(data: T[], pagination: IPagination): void {
    this.records = data;
    this.pagination = pagination;
  }

  onSearch(isReset = false) {
    if (isReset) {
      this.filterForm.reset();
    }
    this.pagination.currentPage = 1;
    this.fetchData();
  }


  protected processFilter() {
    let param: any = {
      page: this.pagination.currentPage,
      per_page: this.pagination.perPage
    };
    if (this.filterForm?.value) {
      let filterData = {...this.filterForm.value};

      Object.keys(this.filterForm.value).forEach(key => {
        if (filterData[key]) {
          param[`filter[${key}]`] = filterData[key];
        }
      });
    }

    return param;
  }


  onQueryParamsChange($event: NzTableQueryParams): void {
    if ($event.pageIndex !== this.pagination.currentPage) {
      this.pagination.currentPage = $event.pageIndex;
      this.fetchData();
    }
  }
}
