import { api } from "../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { cn } from "../../../utils/cn";

// Modular Components (Server Components by default)
import { ResourceHeader } from "../../../modules/resources/ResourceHeader";
import { DepartmentIndicator } from "../../../modules/resources/DepartmentIndicator";
import { DepartmentsHub } from "../../../modules/resources/DepartmentsHub";
import { YearSelectionHub } from "../../../modules/resources/YearSelectionHub";
import { TypePills } from "../../../modules/resources/TypePills";
import { DepartmentPills } from "../../../modules/resources/DepartmentPills";
import { ActiveFiltersDisplay } from "../../../modules/resources/ActiveFiltersDisplay";
import { FilterBar } from "../../../modules/resources/FilterBar";
import { ResourceCard } from "../../../modules/resources/ResourceCard";
import { EmptyState } from "../../../modules/resources/EmptyState";

// Client-side Analytics (requires a bridge or hydration)
// import { useAnalyticsStore } from "../../../store/analyticsStore"; 

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  // Extract filters from URL
  const query = typeof params.search === 'string' ? params.search : '';
  const department = typeof params.department === 'string' ? params.department : '';
  const type = typeof params.type === 'string' ? params.type : '';
  const year = typeof params.year === 'string' ? params.year : '';
  const semester = typeof params.semester === 'string' ? params.semester : '';
  const viewMode = (params.view as 'grid' | 'list') || 'grid';

  // Fetch data from Convex on the Server
  const allResources: any[] = await fetchQuery(api.resources.list);

  // Apply filters on the server
  const filteredResources = allResources.filter((resource: any) => {
    const q = query.toLowerCase().trim();
    const matchesSearch = !q || 
      resource.title.toLowerCase().includes(q) ||
      resource.subject.toLowerCase().includes(q) ||
      resource.description.toLowerCase().includes(q);

    const matchesYear = !year || resource.year === year;
    const matchesSemester = !semester || resource.semester === semester;
    const matchesType = !type || resource.type === type;
    const matchesDepartment = !department || resource.department === department;

    return matchesSearch && matchesYear && matchesSemester && matchesType && matchesDepartment;
  });

  const activeFilters = { year, semester, type, department };

  const isHubView = !department && !query && !type;
  const isYearSelectionView = department && !year && !query;
  const isResourceListView = !isHubView && !isYearSelectionView;

  const showListSection = isResourceListView;
  const hasActiveFilters = Object.values(activeFilters).some(v => v !== '');

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <ResourceHeader />

        {/* Selected Department Indicator (Server Component) */}
        {department && (
          <DepartmentIndicator departmentId={department} />
        )}

        {/* Search and Filters Hub (Client Component) */}
        {showListSection && (
          <FilterBar
            initialViewMode={viewMode}
            initialSearch={query}
            initialFilters={activeFilters}
          />
        )}

        {/* Resource Type Pills (Server Component) - Only in List View */}
        {showListSection && (
          <TypePills 
            activeType={type} 
            searchParams={params}
          />
        )}

        {/* Department Pills - Only when type is selected (Server Component) */}
        {type && showListSection && (
          <DepartmentPills 
            activeDepartment={department} 
            searchParams={params}
          />
        )}

        {/* Active Filters Display (Server Component) */}
        {hasActiveFilters && showListSection && (
          <ActiveFiltersDisplay 
            filters={activeFilters} 
            searchParams={params}
          />
        )}

        {/* Main Departments Hub View (Server Component) */}
        {isHubView && (
          <DepartmentsHub />
        )}

        {/* Year Selection View (Server Component) */}
        {isYearSelectionView && (
          <YearSelectionHub 
            departmentId={department} 
            searchParams={params}
          />
        )}

        {/* Resources Grid/List View */}
        {showListSection && (
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}>
            {filteredResources.length > 0 ? (
              filteredResources.map((resource: any, index: number) => (
                <ResourceCard
                  key={resource._id || resource.id}
                  resource={resource}
                  index={index}
                  viewMode={viewMode}
                />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
