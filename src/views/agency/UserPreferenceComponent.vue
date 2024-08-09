<template>
  <AdminLayout>
    <div>
    <h1 style="text-align: Left">User Preference List</h1>
    <ejs-grid
      :dataSource="userPreferences"
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
          field="id"
          headerText="ID"
          textAlign="Left"
          isPrimaryKey="true"
          :visible="false"
          width="50px"
        ></e-column>
        <e-column
          field="user_id"
          headerText="User ID"
          textAlign="Left"
        ></e-column>
        <e-column
          field="experience_id"
          headerText="Experience ID"
          textAlign="Left"
        ></e-column>
        <e-column
          field="priority"
          headerText="Priority"
          textAlign="Left"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
  </AdminLayout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { UserPreferenceDto } from "../../models/UserPreferenceDto";
import {
  getAllUserPreferences,
  createUserPreference,
  updateUserPreference,
  deleteUserPreference,
} from "../../services/UserPreferenceService";
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
export default class UserPreferenceComponent extends Vue {
  userPreferences: UserPreferenceDto[] = [];
  initialSort = {
    columns: [
      { field: "user_id", direction: "Ascending" },
      { field: "experience_id", direction: "Ascending" },
    ],
  };
  pageSettings = { pageSizes: true, pageSize: 10 };
  filterSettings = { type: "Menu" };
  editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  toolbar = ["Add", "Edit", "Delete", "Update", "Cancel"];
  toast = useToast();

  async mounted() {
    this.userPreferences = await getAllUserPreferences();
  }

  async onActionComplete(args: any) {
    try {
      switch (args.requestType) {
        case "save": {
          if (args.action === "add") {
            const addedUserPreference = await createUserPreference(args.data);
            if (addedUserPreference) {
              this.userPreferences.push(addedUserPreference);
              this.toast.success(`User Preference added successfully!`);
            }
          } else if (args.action === "edit") {
            await updateUserPreference(args.data.id, args.data);
            this.toast.success(`User Preference updated successfully!`);
          }

          break;
        }
        case "delete": {
          const userPreference = args.data[0];
          await deleteUserPreference(userPreference.id);
          this.toast.success(`User Preference deleted successfully!`);
          break;
        }
        default:
          break;
      }
    } catch (error: any) {
      this.toast.error(
        `Error: ${error?.response?.data?.message || error.message}`,
      );
      this.userPreferences = await getAllUserPreferences();
    }
  }
}
</script>

<style scoped>
.user-preference-selection {
  border: 1px solid black;
  padding: 20px;
}
</style>
