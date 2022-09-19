import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS, UserInterface} from '../../../core/interfaces';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService, TeamService} from '../../../core/services';
import {BaseTable} from '../../../shared/abstracts';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TeamInterface} from '../../../core/interfaces/team.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTable<TeamInterface> implements OnInit {
  cols: ColumnInterface[] = this.colums.team;

  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
    public authService: AuthenticationService,
    private fb: FormBuilder,
  ) {
    super(activatedRoute);
  }

  ngOnInit(): void {
    this.initFormFilter();
  }

  initFormFilter(): FormGroup {
    this.filterForm = this.fb.group({
      name: [null]
    });
    return this.filterForm;
  }

  confirm(id: number | string | undefined) {
    this.teamService.delete(id).subscribe(() => {
      this.processData(this.teamService.getAll(super.processFilter()));
    });
  }

  /**
   * Call api to get list
   */
  fetchData(): void {
    const request = this.teamService.getAll(super.processFilter());
    this.processData(request);
  }
}
