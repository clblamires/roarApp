import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchMasterData } from '../services/dataService';
// import { transformData } from '../hooks/useMasterData';

interface MasterDataContextType {
  data: any | null;
  loading: boolean;
  error: any | null;
}

export const MasterDataContext = createContext<MasterDataContextType | undefined>(undefined);

export const MasterDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const masterData = await fetchMasterData();
        setData(masterData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadMasterData();
  }, []);

  return (
    <MasterDataContext.Provider value={{ data, loading, error }}>
      {children}
    </MasterDataContext.Provider>
  );
};

export const useMasterData = (): MasterDataContextType => {
  const context = useContext(MasterDataContext);
  if (!context) {
    throw new Error('useMasterData must be used within a MasterDataProvider');
  }
  return context;
};
