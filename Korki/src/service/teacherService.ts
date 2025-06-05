import axios from 'axios';
const api_url = "http://localhost:8080/"
const header = {        
      headers: {
            'Content-Type': 'application/json'
        },
      withCredentials: true
   }
interface SubjectOption {
  id: number
  name: string
}

interface TeacherFilter {
  locationId: number[] | null;
  subjectId: number | null;
  schoolId: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  page: number;
  size: number;
}

interface TeacherSearchResponseDto {
  firstName: string;
  lastName: string;
  id: string;
  price: number | null;
  avgRating: number | null;
  description: string;
  ratingCount: number
}

export async function fetchTeachers(filter: TeacherFilter) {
  try {
    const response = await fetch('http://localhost:8080/teachers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filter),
      credentials: 'include' 
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data: Array<TeacherSearchResponseDto> = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch teachers:", error);
  }
}

export async function fetchSubjects(): Promise<SubjectOption[]> {
  try {
    const res = await axios.get<SubjectOption[]>(api_url + 'subject/all')
    return res.data
  } catch (err) {
    console.error('Błąd pobierania przedmiotów:', err)
    return []
  }
}

export async function fetchLocations(){
    const res = await fetch("http://localhost:8080/location/all");
    const data: Location[] = await res.json();
  
    console.log(data)
  
    // Group by town
    const townMap: Record<string, Location[]> = {};
  
    data.forEach(location => {
      const town = location.town;
      if (!townMap[town]) townMap[town] = [];
      townMap[town].push(location);
    });
  
  Object.entries(townMap).forEach(([town, locations]) => {
    console.log('Town:', town);
     if (!(locations.length === 1)) {
      
   
    locations.forEach(loc => {
      console.log(' - District:', loc.district, 'ID:', loc.id);
    });
     }
  });
  
    const options = Object.entries(townMap).map(([town, locations]) => {
      if (locations.length === 1 && locations[0].district === null) {
        return {
          label: town,
          key: locations[0].id
        };
      } else {
        return {
          label: town,
          key: town,
          children: locations.map(loc => (
            {
              label: loc.district,
              key: loc.id
            }
          ))
        };
      }
    });
    return options
}

export async function getMe(){
  try {
    const res = await axios.get(api_url + "teachers/me",header)
    return res.data
  } catch (err:any) {
    console.error('Cos nie pykło:', err.message)
  }
}

export async function updateTeacherDetails(data: {
  description: string;
  subjects: { subjectId: number; maturaR: boolean; schoolPrices: [{schoolId: number,price: number }]}[];
  locations: {town:string, district:string|null}[];
}) {
  return await axios.put(`${api_url}teachers/me`, data, header);
}

export async function getTeacherById(id: string){
   try {
    const res = await axios.get(api_url + 'teachers/' + id,header)
   console.log(res.data)
   console.log(res.data.teacher.user.firstName)
    return res.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getStudents(){
  try {
    const res = await axios.get(api_url +"teachers/students",header)
    console.log(res.data)
    return res.data
  } catch (Error) {
    
  }
}