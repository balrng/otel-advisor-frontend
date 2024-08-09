<template>
  <AdminLayout>
    <div>
    <h1 style="text-align: left">Hotel Experience List</h1>
    <ejs-grid
      :dataSource="hotelExperiences"
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
          field="hotel_id"
          headerText="Hotel ID"
          textAlign="Left"
          isPrimaryKey="true"
          :visible="true"
          width="50px"
        ></e-column>
        <e-column
          field="experience_id"
          headerText="Experience ID"
          textAlign="Left"
          isPrimaryKey="true"
          :visible="true"
          width="50px"
        ></e-column>
        <e-column
          field="rating"
          headerText="Rating"
          textAlign="Left"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
  </AdminLayout>
  
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { HotelExperienceDto } from "../../models/HotelExperienceDto";
import {
  getAllHotelExperiences,
  createHotelExperience,
  updateHotelExperience,
  deleteHotelExperience,
} from "../../services/HotelExperienceService";
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
export default class HotelExperienceComponent extends Vue {
  hotelExperiences: HotelExperienceDto[] = [];
  initialSort = {
    columns: [
      { field: "hotel_id", direction: "Ascending" },
      { field: "experience_id", direction: "Ascending" },
    ],
  };
  pageSettings = { pageSizes: true, pageSize: 10 };
  filterSettings = { type: "Menu" };
  editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  toolbar = ["Add", "Edit", "Delete", "Update", "Cancel"];
  toast = useToast();

  async mounted() {
    this.hotelExperiences = await getAllHotelExperiences();
  }

  async onActionComplete(args: any) {
    try {
      switch (args.requestType) {
        case "save": {
          if (args.action === "add") {
            const addedExperience = await createHotelExperience(args.data);
            if (addedExperience) {
              this.hotelExperiences.push(addedExperience);
              this.toast.success(`Hotel Experience added successfully!`);
            }
          } else if (args.action === "edit") {
            await updateHotelExperience(args.data.hotel_id, args.data.experience_id, args.data);
            this.toast.success(`Hotel Experience updated successfully!`);
          }
          break;
        }
        case "delete": {
          const hotelExperience = args.data[0];
          await deleteHotelExperience(hotelExperience.hotel_id, hotelExperience.experience_id);
          this.toast.success(`Hotel Experience deleted successfully!`);
          break;
        }
        default:
          break;
      }
    } catch (error: any) {
      this.toast.error(`Error: ${error?.response?.data?.message || error.message}`);
      this.hotelExperiences = await getAllHotelExperiences();
    }
  }
}
</script>

<style scoped>
.hotel-experience-selection {
  border: 1px solid black;
  padding: 20px;
}
</style>
