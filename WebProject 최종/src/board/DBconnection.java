package board;

import java.sql.*;

public class DBconnection {
	Connection con;
	PreparedStatement pstmt;
	ResultSet rs;
	
	String tableName;
	
	private String userId;
	private String username;
	
	String DB_URL = "jdbc:mysql://localhost:3306/webp?characterEncoding=utf8";
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	
	static final String ID = "root";
	static final String PWD = "Jj#05152907";
	
	public String getUserId() {
		return userId;
	}

	public String getUsername() {
		return username;
	}

	public DBconnection()
	{
		try
		{
			tableName = "";
			
			Class.forName(JDBC_DRIVER);
			
			ConnectWithDB();
		}
		
		catch (Exception e) 
		{
			e.printStackTrace();
		}
	}
	
	private void ConnectWithDB()
	{
		try
		{
			con = DriverManager.getConnection(DB_URL, ID, PWD);
		}
		
		catch (SQLException e)
		{
			e.printStackTrace();
		}
	}
	
	public boolean Write(String username, String email, String pwd)
	{
		boolean result = false;
		
		try
		{
			pstmt = con.prepareStatement("insert into user (name, email, passwd) values (?, ?, ?)");
			
			pstmt.setString(1, username);
			pstmt.setString(2, email);
			pstmt.setString(3, pwd);
			
			pstmt.executeUpdate();
		}
		
		catch (SQLException e)
		{
			e.printStackTrace();
		}
		
		finally
		{
			try
			{
				if (pstmt != null) pstmt.close();
				
				result = true;
			}
			
			catch (SQLException e)
			{
				e.printStackTrace();
			}
		}
		
		return result;
	}
	
	public boolean Write(String ordername, String phone, String cafe, String order)
	{
		boolean result = false;
		
		try
		{
			pstmt = con.prepareStatement("insert into cafeorder (name, phone, cafe, ordercontent) values (?, ?, ?, ?)");
			
			pstmt.setString(1, ordername);
			pstmt.setString(2, phone);
			pstmt.setString(3, cafe);
			pstmt.setString(4, order);
			
			pstmt.executeUpdate();
		}
		
		catch (SQLException e)
		{
			e.printStackTrace();
		}
		
		finally
		{
			try
			{
				if (pstmt != null) pstmt.close();
				
				result = true;
			}
			
			catch (SQLException e)
			{
				e.printStackTrace();
			}
		}

		return result;
	}
	
	public boolean Read(String email, String pwd)
	{
		boolean result = false;
		
		try
		{
			pstmt = con.prepareStatement("select * from user where email = ?");
			
			pstmt.setString(1, email);
			
			rs = pstmt.executeQuery();
			
			rs.next();
			
			if (rs.getString("email").equals(email))
			{
				if (rs.getString("passwd").equals(pwd))
				{
					userId = rs.getString("id");
					username = rs.getString("name");
					
					result = true;
				}
			}
		}
		
		catch (SQLException e)
		{
			e.printStackTrace();
		}
		
		finally
		{
			try
			{
				if (rs != null) rs.close();
				if (pstmt != null) pstmt.close();
			}
			
			catch (SQLException e)
			{
				e.printStackTrace();
			}
		}
		
		return result;
	}
	
	public void CloseConnect()
	{
		try
		{
			if (con != null) con.close();
		}
		
		catch (SQLException e)
		{
			e.printStackTrace();
		}
	}
}
