<template>
  <AdminLayout>
  <div>
    <h1 style="text-align: Left">User List</h1>
    <ejs-grid
      :dataSource="users"
      :allowResizing="true"
      :allowSorting="true"
      :allowFiltering="true"
      allowPaging="true"
      :filterSettings="filterSettings"
      :editSettings="editSettings"
      :toolbar="toolbar"
      :sortSettings="initialSort"
      :pageSettings="pageSettings"
      @actionComplete="onActionComplete"
    >
      <e-columns>
        <e-column
          field="user_id"
          headerText="ID"
          textAlign="Left"
          isPrimaryKey="true"
          :visible="false"
          width="50px"
        ></e-column>
        <e-column field="name" headerText="Name" textAlign="Left"></e-column>
        <e-column field="email" headerText="Email" textAlign="Left"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
  </AdminLayout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { UserDto } from "../../models/UserDto";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/UserService";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Filter,
  Page,
  Sort,
  Toolbar,
  Edit,
  Resize,
} from "@syncfusion/ej2-vue-grids";
import { useToast } from "vue-toastification";
import AdminLayout from './AdminLayout.vue'; 

@Options({
  components: {
    "ejs-grid": GridComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective,
    AdminLayout,
  },
  provide: {
    grid: [Resize, Sort, Page, Toolbar, Edit, Filter],
  },
})
export default class UserComponent extends Vue {
  users: UserDto[] = [];
  initialSort = {
    columns: [
      { field: "name", direction: "Ascending" },
      { field: "email", direction: "Ascending" },
    ],
  };
  pageSettings = { pageSizes: true, pageSize: 10 };
  filterSettings = { type: "Menu" };
  editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  toolbar = ["Add", "Edit", "Delete", "Update", "Cancel"];
  toast = useToast();

  async mounted() {
    this.users = await getAllUsers();
  }

  async onActionComplete(args: any) {
    try {
      switch (args.requestType) {
        case "save": {
          if (args.action === "add") {
            const addedUser = await createUser(args.data);
            if (addedUser) {
              this.users.push(addedUser);
              this.toast.success(`Succeed!`);
            }
          } else if (args.action === "edit") {
            await updateUser(args.data.user_id, args.data);
            this.toast.success(`Succeed!`);
          }

          break;
        }
        case "delete": {
          const user = args.data[0];
          await deleteUser(user.user_id);
          this.toast.success(`Succeed!`);
          break;
        }
        default:
          break;
      }
    } catch (error: any) {
      this.toast.error(
        `Error: ${error?.response?.data?.message || error.message}`,
      );
      this.users = await getAllUsers();
    }
  }
}
</script>
