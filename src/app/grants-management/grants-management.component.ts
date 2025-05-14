import { Component, inject } from '@angular/core';
import { Grant, GrantPosition } from "../models/invoice-model";
import { MatDialog } from "@angular/material/dialog";
import { GrantsService } from "../services/grants.service";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { CommonModule, NgForOf } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { CdkDragDrop, DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddEditGrantDialogComponent } from "../add-edit-grant-dialog/add-edit-grant-dialog.component";
import {
  AddEditGrantPositionDialogComponent
} from "../add-edit-grant-position-dialog/add-edit-grant-position-dialog.component";

@Component({
  selector: 'app-grants-management',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NgForOf,
    MatTableModule,
    MatMenuModule,
    DragDropModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './grants-management.component.html',
  styleUrl: './grants-management.component.css'
})
export class GrantsManagementComponent {
  displayedColumns = ['id', 'alias', 'budget']
  public editModeGrantIds: string[] = [];
  public grantsList: Grant[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private grantsService: GrantsService) {
    this.grantsService.grants$.subscribe(users => {
      this.grantsList = users;
    });
  }

  public isEditMode(grant: Grant): boolean {
    return this.editModeGrantIds.includes(grant.id);
  }

  public editGrant(grant: Grant) {
    this.editModeGrantIds.push(grant.id);
  }

  public saveGrant(grant: Grant) {
    this.editModeGrantIds = this.editModeGrantIds.filter(id => id != grant.id);
    this.editGrantInfo(grant);
  }

  public deleteGrant(grant: Grant) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        deleteLabel: grant.alias
      },
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.grantsService.deleteGrant(Number(grant.id)).subscribe(() => {
          this.grantsService.updateGrants().subscribe(grants => {
            this.grantsList = grants;
          });
        });
      }
    });
  }

  drop(event: CdkDragDrop<string[]>, grant: Grant) {
    moveItemInArray(grant.positions, event.previousIndex, event.currentIndex);
    this.fixIndexing(grant);
  }

  public addGrant() {
    const dialogRef = this.dialog.open(AddEditGrantDialogComponent, {
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((grant: Grant) => {
      if (grant) {
        this.grantsService.addGrant(grant).subscribe(() => {
          this.grantsService.updateGrants().subscribe(grants => {
            this.grantsList = grants;
          });
        });
      }
    });
  }

  public editGrantInfo(grant: Grant) {
    this.grantsService.updateGrant(Number(grant.id), grant).subscribe( () => {
      this.grantsService.updateGrants().subscribe(grants => {
        this.grantsList = grants;
      });
    });
  }

  public deletePosition(grant: Grant, position: GrantPosition) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        deleteLabel: position.alias
      },
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        grant.positions = grant.positions.filter(pos => pos != position);
        this.fixIndexing(grant);
        this.editGrantInfo(grant);
      }
    });
  }
  public addPosition(grant: Grant) {
    const dialogRef = this.dialog.open(AddEditGrantPositionDialogComponent, {
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((grantPosition: GrantPosition) => {
      if (grantPosition) {
        grant.positions.push(grantPosition);
        this.fixIndexing(grant);
        this.editGrantInfo(grant);
      }
    });
  }
  public editPosition(position: GrantPosition, grant: Grant) {
    const dialogRef = this.dialog.open(AddEditGrantPositionDialogComponent, {
      data: {
        position: position
      },
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((newPosition: GrantPosition) => {
      if (newPosition) {
        position.alias = newPosition.alias;
        position.budget = newPosition.budget;
        this.editGrantInfo(grant);
      }
    });
  }

  private fixIndexing(grant: Grant) {
    let i = 1;
    grant.positions.forEach(position => {
      position.id = i.toString();
      i += 1;
    });
  }
}
