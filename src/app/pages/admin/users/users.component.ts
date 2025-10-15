import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { UserService, UserFilters } from '../../../core/services/user.service';
import { User } from '../../../core/interfaces';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'status', 'date', 'actions'];
  loading = false;

  // Filters
  roleFilter = '';
  statusFilter = '';
  
  // Roles disponibles (se cargan dinámicamente)
  availableRoles: Array<{ id: string; name: string; display_name: string }> = [];

  // Pagination
  totalUsers = 0;
  pageSize = 10;
  currentPage = 1;

  ngOnInit(): void {
    this.loadAvailableRoles();
    this.loadUsers();
  }
  
  /**
   * Cargar roles disponibles desde los usuarios
   */
  loadAvailableRoles(): void {
    // Hacer una petición inicial para obtener roles únicos
    this.userService.getUsers({ limit: 100 }).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const rolesMap = new Map<string, { id: string; name: string; display_name: string }>();
          
          response.data.forEach((user: User) => {
            if (user.role && user.role.id) {
              rolesMap.set(user.role.id, {
                id: user.role.id,
                name: user.role.name,
                display_name: user.role.display_name || user.role.name
              });
            }
          });
          
          this.availableRoles = Array.from(rolesMap.values());
        }
      },
      error: (error) => {
        console.error('Error al cargar roles:', error);
      }
    });
  }

  loadUsers(): void {
    this.loading = true;
    const filters: UserFilters = {
      page: this.currentPage,
      limit: this.pageSize
    };

    if (this.roleFilter) filters.role = this.roleFilter;
    if (this.statusFilter !== '') filters.isActive = this.statusFilter === 'active';

    this.userService.getUsers(filters).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.users = response.data;
          this.totalUsers = response.meta?.pagination?.total || 0;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.showMessage('Error al cargar usuarios', 'error');
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  clearFilters(): void {
    this.roleFilter = '';
    this.statusFilter = '';
    this.currentPage = 1;
    this.loadUsers();
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser(user.id, result);
      }
    });
  }

  updateUser(id: string, data: any): void {
    this.loading = true;
    this.userService.updateUser(id, data).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage('Usuario actualizado exitosamente', 'success');
          this.loadUsers();
        }
      },
      error: (error) => {
        console.error('Error al actualizar usuario:', error);
        this.showMessage(error.message || 'Error al actualizar usuario', 'error');
        this.loading = false;
      }
    });
  }

  toggleUserStatus(user: User): void {
    const action = user.is_active ? 'desactivar' : 'activar';
    if (confirm(`¿Estás seguro de que deseas ${action} al usuario "${user.first_name} ${user.last_name}"?`)) {
      this.loading = true;
      const request = user.is_active 
        ? this.userService.deactivateUser(user.id)
        : this.userService.activateUser(user.id);

      request.subscribe({
        next: (response) => {
          if (response.success) {
            this.showMessage(`Usuario ${action}do exitosamente`, 'success');
            this.loadUsers();
          }
        },
        error: (error) => {
          console.error(`Error al ${action} usuario:`, error);
          this.showMessage(error.message || `Error al ${action} usuario`, 'error');
          this.loading = false;
        }
      });
    }
  }

  deleteUser(user: User): void {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario "${user.first_name} ${user.last_name}"? Esta acción no se puede deshacer.`)) {
      this.loading = true;
      this.userService.deleteUser(user.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.showMessage('Usuario eliminado exitosamente', 'success');
            this.loadUsers();
          }
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          this.showMessage(error.message || 'Error al eliminar usuario', 'error');
          this.loading = false;
        }
      });
    }
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error']
    });
  }
}
