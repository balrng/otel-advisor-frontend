<!-- views/agency/ExperienceComponent.vue -->
<template>
  <AdminLayout>
    <template v-slot>
      <div>
        <h1 style="text-align: left">Experience List</h1>
        <ejs-grid
          :dataSource="experiences"
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
              field="experience_id"
              headerText="ID"
              textAlign="left"
              isPrimaryKey="true"
              :visible="false"
              width="50px"
            ></e-column>
            <e-column field="name" headerText="Name" textAlign="left"></e-column>
            <e-column
              field="description"
              headerText="Description"
              textAlign="left"
            ></e-column>
          </e-columns>
        </ejs-grid>
      </div>
    </template>
  </AdminLayout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ExperienceDto } from "../../models/ExperienceDto";
import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../services/ExperienceService";
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
export default class ExperienceComponent extends Vue {
  experiences: ExperienceDto[] = [];
  initialSort = {
    columns: [
      { field: "name", direction: "Ascending" },
      { field: "description", direction: "Ascending" },
    ],
  };
  pageSettings = { pageSizes: true, pageSize: 10 };
  filterSettings = { type: "Menu" };
  editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  toolbar = ["Add", "Edit", "Delete", "Update", "Cancel"];
  toast = useToast();

  async mounted() {
    this.experiences = await getAllExperiences();
  }

  async onActionComplete(args: any) {
    try {
      switch (args.requestType) {
        case "save": {
          if (args.action === "add") {
            const addedExperience = await createExperience(args.data);
            if (addedExperience) {
              this.experiences.push(addedExperience);
              this.toast.success(`Experience added successfully!`);
            }
          } else if (args.action === "edit") {
            await updateExperience(args.data.experience_id, args.data);
            this.toast.success(`Experience updated successfully!`);
          }

          break;
        }
        case "delete": {
          const experience = args.data[0];
          await deleteExperience(experience.experience_id);
          this.toast.success(`Experience deleted successfully!`);
          break;
        }
        default:
          break;
      }
    } catch (error: any) {
      this.toast.error(
        `Error: ${error?.response?.data?.message || error.message}`,
      );
      this.experiences = await getAllExperiences();
    }
  }
}
</script>

<style scoped>
.experience-selection {
  border: 1px solid black;
  padding: 20px;
}
</style>
